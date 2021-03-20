import React from "react";
import styled from 'styled-components'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
} from "@material-ui/core";

export const Container = styled.div`
    display: flex;
    flex-direction:column;
    align-items:flex-start;
    padding: 12px;
`

export const Mini = styled.div`
    display:flex;
    min-width:400px;
    align-items:center;
`

/**
 * Type of acceptButtonConfig
 *  acceptButtonConfig = {
 *      color: 'primary' | 'secondary';
 *      onClick: () => void;
 *      text: string;
 *   }
 */

const Modal = (props) => {
    const { children, title, onClose, visible, requireFooter = true, acceptButtonConfig } = props;

    return (
        <Dialog
            open={visible}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            disableBackdropClick
            disableEscapeKeyDown
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Container>
                    {children}
                    {requireFooter && (
                        <Mini style={{ justifyContent: acceptButtonConfig ? 'space-between' : 'flex-end' }}>
                            {acceptButtonConfig && (
                                <Button
                                    variant="contained"
                                    color={acceptButtonConfig.color ? acceptButtonConfig.color : "primary"}
                                    style={{ margin: "8px 8px 8px 0", ...(acceptButtonConfig.color === 'primary' && { background: '#800080' }), padding: '8px 20px' }}
                                    onClick={acceptButtonConfig.onClick}
                                >
                                    {acceptButtonConfig.text || ''}
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                style={{ margin: "8px 0 8px 8px", background: "#800080", padding: '8px 20px' }}
                                color="primary"
                                onClick={onClose}
                            >
                                Close
                             </Button>
                        </Mini>
                    )}
                </Container>
            </DialogContent>
        </Dialog>
    )

}

export default Modal;