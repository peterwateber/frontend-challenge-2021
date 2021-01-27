## How to use
-`$ npm i`
-`$ npm start`

## Code structure


#### Pages
```
src/
    pages/
        widgets/
            components/
                Form/
                    Buttons.tsx
                    Datepicker.tsx
                CustomCard.tsx
                CustomDialog.tsx
                Preview.tsx
            AddWidget.tsx
            index.tsx
```
- Inside widgets, are the pages which are relevant to the routes: `http://localhost:3000/` and `htpp://localhost:3000/add`. These links will point to `index.tsx` and `AddWidget.tsx` respectively.
- **components/** folder is used for displaying commonality for these pages. Which could also mean "widget"


#### File naming convention
- Small case for `index.tsx` or anything that is the default access of the folder which is `index`
- Otherwise, `Pascalcase` is used

### Folder naming convention
- Small case for any folder except those inside `components/`