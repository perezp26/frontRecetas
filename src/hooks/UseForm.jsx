
import { useState } from 'react';


export const UseForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = ( newFormState = initialState) => {
        setValues( newFormState );
    }


    const handleInputChange = (name, value) => {
        setValues({
            ...values,
            [ name ]: value
        });

    }

    return [ values, handleInputChange, reset ];

}