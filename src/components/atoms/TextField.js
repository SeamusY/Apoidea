import React, { useState } from 'react';
import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';

export const TextField = ({}) => {
    <InputUnstyled
      components={{ Input: StyledInputElement, Textarea: StyledTextareaElement }}
      {...props}
    />
}