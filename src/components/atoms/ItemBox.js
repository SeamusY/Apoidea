import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Item';
import Item from '@mui/material/Item'
import { Box } from '@mui/system';
export const row = ({name, weight, value}) => {
    return (
        <Grid item bgcolor={value < 0 ? "red": "green"}>
            <Item>
                <Box>{name}</Box>
                <Box>{value}</Box>
            </Item>
        </Grid>
    )
}