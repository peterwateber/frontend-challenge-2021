import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import DateFnsUtils from "@date-io/date-fns"
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers"

const Datepickers: React.FC = () => {
    const classes = useStyles()
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date()
    )

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date)
    }
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        fullWidth
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        fullWidth
                        label="Time picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            "aria-label": "change time",
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        </form>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    })
)

export default Datepickers
