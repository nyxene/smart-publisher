import React from 'react';

import { useInput } from '~core/form/useInput';

import { Post } from './Post';
import { UsePostConfig } from './types';

export const usePost = ({
    value: postValue = '',
    label,
    placeholder,
    disabled = false,
    mainTextMaxLength,
    textSeparator
}: UsePostConfig = {}): [
    React.ReactElement,
    {
        value: string;
        setPost: (post: string) => void;
        disabledPost: boolean;
        setDisabledPost: (value: boolean) => void;
        clearPost: () => void;
        copyToClipboard: () => void;
    }
] => {
    const postRef = React.useRef<HTMLTextAreaElement | null>(null);

    const {
        value,
        onChange,
        setValue: setPost,
        disabled: disabledPost,
        setDisabled: setDisabledPost,
        clear: clearPost
    } = useInput<string>({ value: postValue, disabled });

    const control = React.createElement(Post, {
        value,
        label,
        placeholder,
        disabled: disabledPost,
        textSeparator,
        mainTextMaxLength,
        postRef,
        onChange
    });

    const copyToClipboard = React.useCallback(() => {
        if (postRef.current) {
            postRef.current.select();
            document.execCommand('copy');
            postRef.current.setSelectionRange(0, 0);
            postRef.current.blur();
        }
    }, []);

    return [
        control,
        {
            value: value || '',
            setPost,
            disabledPost,
            setDisabledPost,
            clearPost,
            copyToClipboard
        }
    ];
};
