import TextToPng from './textToPng';

interface ConverterProps {
    postMaxLength?: number;
    textColor?: string;
    bgColor?: string;
}

interface ConverterResult {
    post: string;
    images: string[];
}

const POST_MAX_LENGTH: number = 22;

export default class Converter implements ConverterProps {
    readonly postMaxLength: number;
    readonly textColor: string;
    readonly bgColor: string;

    constructor({
        postMaxLength = POST_MAX_LENGTH,
        textColor = '',
        bgColor = ''
    } = {}) {
        this.postMaxLength = postMaxLength;
        this.textColor = textColor;
        this.bgColor = bgColor;
    }

    public run(originalPost: string): ConverterResult {
        try {
            const { post, otherText } = this.preparePost(originalPost);

            const t2p: TextToPng = new TextToPng({
                textColor: this.textColor,
                bgColor: this.bgColor
            });

            let images: string[] = [];

            if (!!otherText) {
                images = t2p.render(otherText);
            }

            return { post, images };
        } catch (e) {
            throw new Error(e);
        }
    }

    private preparePost(originalPost: string) {
        if (!originalPost || typeof originalPost !== 'string') {
            throw new Error('Error when prepare post. Post is empty or not string');
        }

        const post = originalPost.trim().replace(/ ,/g, ', ');

        return {
            post: post.substring(0, this.postMaxLength),
            otherText: post.substring(this.postMaxLength)
        };
    }
}
