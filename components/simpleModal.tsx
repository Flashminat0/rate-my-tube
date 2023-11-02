import React from 'react';
import {Dialog} from "@mui/material";

export interface SimpleModalProps extends React.PropsWithChildren {
    open: boolean;
    onClose: () => void;
}

const SimpleModal = (props: SimpleModalProps) => {
    const {onClose, open, children} = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value: string) => {

    };


    return (
        <Dialog onClose={handleClose} open={open}>
            {children}
        </Dialog>
    );
};

export default SimpleModal;

