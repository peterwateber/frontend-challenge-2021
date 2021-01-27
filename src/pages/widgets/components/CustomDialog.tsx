import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { useTranslation } from "react-i18next"

const CustomDialog: React.FC = () => {
    const [open, setOpen] = React.useState(false)
    const { t } = useTranslation()

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                {t("Dialog.OpenAlertDialog")}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t("Dialog.OpenAlertDialogTitle")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t("Dialog.OpenAlertDialogContent")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {t("Dialog.OpenAlertDialogButton.Agree")}
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        {t("Dialog.OpenAlertDialogButton.Disagree")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CustomDialog
