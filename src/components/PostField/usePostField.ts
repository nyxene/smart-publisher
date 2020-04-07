import React, { useRef } from 'react';

import { useInput } from '~core/form/useInput';

import { PostField } from './PostField';
import { UsePostFieldConfig } from './types';

export const usePostField = ({ post: value = '', disabled = false, height = '' }: UsePostFieldConfig = {}): [
    React.ReactElement,
    {
        post: string;
        setPost: (post: string) => void;
        disabledPost: boolean;
        setDisabledPost: (value: boolean) => void;
        readonlyPost: boolean;
        setReadonlyPost: (value: boolean) => void;
        clearPost: () => void;
        copyToClipboard: () => void;
    }
] => {
    const postRef = useRef<HTMLTextAreaElement | null>(null);

    const {
        value: post,
        onChange,
        setValue: setPost,
        disabled: disabledPost,
        setDisabled: setDisabledPost,
        readonly: readonlyPost,
        setReadonly: setReadonlyPost,
        clear: clearPost
    } = useInput<string>({ value, disabled });

    const control = React.createElement(PostField, {
        post,
        postRef,
        disabled: disabledPost,
        readonly: readonlyPost,
        onChange,
        height
    });

    const copyToClipboard = () => {
        if (postRef.current) {
            postRef.current.select();
            document.execCommand('copy');
            postRef.current.setSelectionRange(0, 0);
            postRef.current.blur();
        }
    };

    return [
        control,
        {
            post: post || '',
            setPost,
            disabledPost,
            setDisabledPost,
            readonlyPost,
            setReadonlyPost,
            clearPost,
            copyToClipboard
        }
    ];
};
