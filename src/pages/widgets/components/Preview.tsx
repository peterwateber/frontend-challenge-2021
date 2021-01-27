import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"
import { LanguagesCode } from "types"
import { useTranslation } from "react-i18next"

interface Props {
    Widget: [React.FC<any>]
    selectedLanguage: LanguagesCode | null
}

const Preview: React.FC<Props> = (props) => {
    const classes = useStyles()
    const { Widget } = props
    const { i18n } = useTranslation()

    React.useEffect(() => {
        i18n.changeLanguage(props.selectedLanguage || LanguagesCode.English)
    }, [i18n, props.selectedLanguage])

    return (
        <div>
            <h2 className={classes.previewTitle}>Preview</h2>
            {Widget}
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        previewTitle: {
            marginTop: 0,
        },
    })
)

export default Preview
