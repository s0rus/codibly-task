import { Stack, Typography } from '@mui/material';
import React, { ComponentType } from 'react';

interface Props {
  IconElement: ComponentType;
  label: string;
}

const Information = ({ IconElement, label }: Props) => {
  return (
    <Stack
      justifyContent='center'
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '321px',
      }}
    >
      <IconElement />
      <Typography mt='1rem' fontWeight={700}>
        {label}
      </Typography>
    </Stack>
  );
};

export default Information;
