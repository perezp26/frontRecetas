import { ErrorMessage } from "formik";

import React from 'react'

const MyLabel = ({ label, name  }) => {
  return (
    <div className="flex">
                <label 
                    htmlFor={ name }
                    className="block text-grey-darker text-sm font-light"
                >
                        { label }
                </label>
                
                <ErrorMessage name={ name} component="span" className="text-xs text-red-700 m-0.5"/>
    </div>
  )
}

export default MyLabel