import { Button, createStyles, makeStyles, Theme } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import Divider from "@material-ui/core/Divider"
import Paper from "@material-ui/core/Paper"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import React from "react"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"
import { RootState } from "store"
import { getLocalStorage, removeItemFromWidget } from "store/actions/Widgets"
import { FrontEndWidgets, Widget } from "types"
import CustomCard from "./components/CustomCard"
import CustomDialog from "./components/CustomDialog"
import Datepickers from "./components/Form/Datepickers"

interface DispatchProps {
    getLocalStorage: () => void
    removeItemFromWidget: (id: string) => void
}

interface Props extends DispatchProps {
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
            <div className={classes.content}>
                {hasWidgets &&
                    props.widgets.map((item, idx) => {
                        return (
                            <div className={classes.gridItem} key={idx}>
                                {item.widget === FrontEndWidgets.Card && (
                                    <div data-testid={`item-${item.id}`}>
                                        <Button
                                            data-testid={`button-${item.id}`}
                                            onClick={() =>
                                                handleRemove(item.id)
                                            }
                                        >
                                            Remove
                                            <DeleteForeverIcon />
                                        </Button>
                                        <CustomCard />
                                    </div>
                                )}
                                {item.widget === FrontEndWidgets.Dialog && (
                                    <div data-testid={`item-${item.id}`}>
                                        <Button
                                            data-testid={`button-${item.id}`}
                                            onClick={() =>
                                                handleRemove(item.id)
                                            }
                                        >
                                            Remove
                                            <DeleteForeverIcon />
                                        </Button>
                                        <Paper
                                            className={classes.paper}
                                            elevation={3}
                                        >
                                            <CustomDialog />
                                        </Paper>
                                    </div>
                                )}
                                {item.widget === FrontEndWidgets.Datepicker && (
                                    <div data-testid={`item-${item.id}`}>
                                        <Button
                                            data-testid={`button-${item.id}`}
                                            onClick={() =>
                                                handleRemove(item.id)
                                            }
                                        >
                                            Remove
                                            <DeleteForeverIcon />
                                        </Button>
                                        <Paper
                                            className={classes.paper}
                                            elevation={3}
                                        >
                                            <Datepickers />
                                        </Paper>
                                    </div>
                                )}
                            </div>
                        )
                    })}
            </div>
            <Dialog
                data-testid="dialog"
                open={removeDialog}
                onClose={handleDialogCancel}
            >
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove widget?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        data-testid="button-dialog-confirm"
                        onClick={handleDialogOkay}
                        color="primary"
                        autoFocus
                    >
                        Okay
                    </Button>
                    <Button
                        data-testid="button-dialog-cancel"
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            columnGap: 3,
            columnCount: 2,
            [theme.breakpoints.up("md")]: {
                columnCount: 3,
                padding: "20px 0 40px 0",
            },
        },
        gridItem: {
            breakInside: "avoid",
            padding: 10,
        },
        paper: {
            padding: 15,
        },
    })
)

const mapStateToProps = (state: RootState) => ({
    widgets: state.widgets.widgets,
})

const mapPropsToDispatch = {
    getLocalStorage,
    removeItemFromWidget,
}

export default connect(mapStateToProps, mapPropsToDispatch)(WidgetsPage)
