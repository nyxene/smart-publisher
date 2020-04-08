import React, { useCallback, useRef } from 'react';

import { useInput } from '~core/form/useInput';

import { PostField } from './PostField';
import { UsePostFieldConfig } from './types';

export const usePostField = ({ value: postValue = '', disabled = false }: UsePostFieldConfig = {}): [
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
    const postRef = useRef<HTMLTextAreaElement | null>(null);

    const {
        value,
        onChange,
        setValue: setPost,
        disabled: disabledPost,
        setDisabled: setDisabledPost,
        clear: clearPost
    } = useInput<string>({ value: postValue, disabled });

    const control = React.createElement(PostField, {
        value,
        postRef,
        disabled: disabledPost,
        onChange
    });

    const copyToClipboard = useCallback(() => {
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
