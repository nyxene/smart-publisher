import React from 'react';

import { useInput } from '~/core/form/useInput';

import { Post } from './Post';
import { UsePostConfig, UsePostOutput } from './types';

export const usePost = ({
    value: postValue = '',
    label,
    placeholder,
    disabled = false,
    textSeparator
}: UsePostConfig = {}): [React.ReactElement, UsePostOutput] => {
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
