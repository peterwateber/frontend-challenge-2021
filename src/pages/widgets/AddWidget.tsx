import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import Grid from "@material-ui/core/Grid"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React from "react"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"
import { RootState } from "store"
import {
    getLocalStorage,
    addWidgets,
    WidgetsAction,
} from "store/actions/Widgets"
import { FrontEndWidgets, Languages, LanguagesCode, Widget } from "types"
import { sanitizeInput, widgetOptions } from "utils/PageUtils"
import Preview from "./components/Preview"

interface DispatchProps {
    getLocalStorage: () => void
    addWidgets: (payload: Widget[]) => WidgetsAction
}

interface Props extends DispatchProps {
    currentLanguage: LanguagesCode
}

const AddWidget: React.FC<Props> = (props) => {
    const classes = useStyles()
    const [renderWidget, setRenderWidget] = React.useState<any>([])
    const [
        selectedWidget,
        setSelectedWidget,
    ] = React.useState<FrontEndWidgets | null>(null)
    const [
        selectedLanguage,
        setSelectedLanguage,
    ] = React.useState<LanguagesCode | null>(null)
    const [formSubmitted, setFormSubmitted] = React.useState(0)
    const [formDialogOpen, setFormDialogOpen] = React.useState(false)
    const [dialogMessage, setDialogMessage] = React.useState("")
    const [didLoad, setDidLoad] = React.useState<boolean>(false)
    const { getLocalStorage } = props

    const _widgetOptions = Object.values(FrontEndWidgets).map((widget, idx) =>
        widgetOptions(widget, idx)
    )

    const handleWidgetSelection = (
        event: React.ChangeEvent<any>,
        option: any
    ) => {
        if (Boolean(option)) {
            setSelectedWidget(option.name)
            setRenderWidget([<option.component key={option.id} />])
        } else {
            setRenderWidget([])
        }
    }

    const getOptionSelected = (option: any, value: any) => {
        return option.name === value.name
    }

    const handleLanguageSelection = (
        event: React.ChangeEvent<{}>,
        option: { name: string; code: LanguagesCode } | null
    ) => {
        setSelectedLanguage(option?.code || LanguagesCode.English)
    }

    const pageReset = () => {
        setFormSubmitted(formSubmitted + 1)
        setRenderWidget([])
    }

    const handleFormSubmission = (ev: React.SyntheticEvent) => {
        ev.preventDefault()
        try {
            const { language, widget } = sanitizeInput({
                widget: selectedWidget,
                language: selectedLanguage,
            })
            props.addWidgets([
                { id: new Date().valueOf().toString(), widget, language },
            ])
            pageReset()
            window.location.href = "/"
        } catch (ex) {
            setFormDialogOpen(true)
            setDialogMessage(ex)
        }
    }

    const handleFormDialog = () => {
        setFormDialogOpen(false)
    }

    React.useEffect(() => {
        if (!didLoad) {
            getLocalStorage()
            setDidLoad(true)
        }
    }, [didLoad, getLocalStorage])

    return (
        <Container fixed className={classes.root}>
            <Helmet>
                <title>Add widget</title>
            </Helmet>
            <Grid container spacing={5}>
                <Grid className={classes.left} item xs={12} sm={4}>
                    <form key={formSubmitted}>
                        <div className={classes.formControl}>
                            <Autocomplete
                                options={_widgetOptions}
                                getOptionLabel={(option) => option.name}
                                onChange={handleWidgetSelection}
                                fullWidth
                                getOptionSelected={getOptionSelected}
                                noOptionsText="No widget found."
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select widget"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </div>
                        <div className={classes.formControl}>
                            <Autocomplete
                                options={Languages}
                                getOptionLabel={(option) => option.name}
                                fullWidth
                                noOptionsText="No language found."
                                onChange={handleLanguageSelection}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select language"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </div>
                        <div className={classes.formControl}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={handleFormSubmission}
                            >
                                Add widget
                            </Button>
                        </div>
                        <Button type="button" color="primary" disableElevation href="/">
                            Go back to Overview page
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={12} sm={8} md={5} lg={4}>
                    <React.Suspense fallback="Loading">
                        <Preview
                            Widget={renderWidget}
                            selectedLanguage={selectedLanguage}
                        />
                    </React.Suspense>
                </Grid>
            </Grid>
            <Dialog
                open={formDialogOpen}
                onClose={handleFormDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText
                        dangerouslySetInnerHTML={{
                            __html: dialogMessage || "",
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleFormDialog}
                        color="primary"
                        autoFocus
                    >
                        Okay
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: "40px 20px",
            [theme.breakpoints.up("md")]: {
                padding: "40px 0",
            },
        },
        left: {
            [theme.breakpoints.up("md")]: {
                borderRight: "1px solid #CCC",
            },
        },
        formControl: {
            marginBottom: 15,
        },
        previewTitle: {
            marginTop: 0,
        },
    })
)

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {
    getLocalStorage,
    addWidgets,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWidget)
