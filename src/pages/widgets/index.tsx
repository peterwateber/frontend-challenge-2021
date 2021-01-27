import { Button, createStyles, makeStyles } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import React from "react"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"
import { RootState } from "store"
import { getLocalStorage, removeItemFromWidget } from "store/actions/Widgets"
import { FrontEndWidgets, Widget } from "types"
import Datepickers from "./components/Form/Datepickers"
import CustomCard from "./components/CustomCard"
import CustomDialog from "./components/CustomDialog"
import { RouteComponentProps } from "react-router-dom"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"

interface DispatchProps {
    getLocalStorage: () => void
    removeItemFromWidget: (id: string) => void
}

interface Props extends DispatchProps, RouteComponentProps<any> {
    widgets: Widget[]
}

const WidgetsPage: React.FC<Props> = (props) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const [didLoad, setDidLoad] = React.useState<boolean>(false)
    const [removeDialog, setRemoveDialog] = React.useState(false)
    const [targetWidgetId, setTargetWidgetId] = React.useState("")
    const { getLocalStorage } = props

    React.useEffect(() => {
        if (!didLoad) {
            getLocalStorage()
            setDidLoad(true)
        }
    }, [didLoad, getLocalStorage])

    const hasWidgets = Boolean(props.widgets.length)

    const linkToAdd = () => {
        window.location.href = "/add"
    }

    const handleRemove = (id: string) => {
        setRemoveDialog(true)
        setTargetWidgetId(id)
    }

    const handleDialogOkay = () => {
        setRemoveDialog(false)
        props.removeItemFromWidget(targetWidgetId)
    }

    const handleDialogCancel = () => {
        setRemoveDialog(false)
        setTargetWidgetId("")
    }

    return (
        <Container fixed>
            <h1>
                {t("Overview")}{" "}
                <Button variant="contained" color="primary" onClick={linkToAdd}>
                    Add widgets!
                </Button>
            </h1>
            <Divider />
            <Grid container spacing={3} className={classes.content}>
                {hasWidgets &&
                    props.widgets.map((item, idx) => {
                        return (
                            <Grid key={idx} item xs={12} sm={6} md={4} lg={4}>
                                {item.widget === FrontEndWidgets.Card && (
                                    <React.Fragment>
                                        <Button
                                            onClick={() =>
                                                handleRemove(item.id)
                                            }
                                        >
                                            Remove
                                            <DeleteForeverIcon />
                                        </Button>
                                        <CustomCard />
                                    </React.Fragment>
                                )}
                                {item.widget === FrontEndWidgets.Dialog && (
                                    <React.Fragment>
                                        <Button
                                            onClick={() =>
                                                handleRemove(item.id)
                                            }
                                        >
                                            Remove
                                            <DeleteForeverIcon />
                                        </Button>
                                        <CustomDialog />
                                    </React.Fragment>
                                )}
                                {item.widget === FrontEndWidgets.Datepicker && (
                                    <React.Fragment>
                                        <Button
                                            onClick={() =>
                                                handleRemove(item.id)
                                            }
                                        >
                                            Remove
                                            <DeleteForeverIcon />
                                        </Button>
                                        <Datepickers />
                                    </React.Fragment>
                                )}
                            </Grid>
                        )
                    })}
            </Grid>
            <Dialog
                open={removeDialog}
                onClose={handleDialogCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove widget?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDialogOkay}
                        color="primary"
                        autoFocus
                    >
                        Okay
                    </Button>
                    <Button
                        onClick={handleDialogCancel}
                        color="primary"
                        autoFocus
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

const useStyles = makeStyles(() =>
    createStyles({
        content: {
            paddingTop: 20,
        },
    })
)

const mapStateToProps = (state: RootState) => ({
    widgets: state.widgets.widgets,
})

const mapPropsToDispatch = {
    getLocalStorage,
    removeItemFromWidget
}

export default connect(mapStateToProps, mapPropsToDispatch)(WidgetsPage)
