import { ErrorMessage, useField } from "formik";


export const MyTextInput = ( { label, error= undefined , labelClassName, textCenter= false, disabled = false, ...props} ) => {
    
    const [ field ] = useField(props);
  return (
        <>
            <div className="flex">
                <label 
                    htmlFor={ props.id || props.name }
                    className="block text-grey-darker text-sm font-light"//className= { labelClassName }
                >
                        { label }
                </label>
                
                <ErrorMessage name={ props.name} component="span" className="text-xs text-red-700 m-0.5"/>
            </div>
            
            <input {...field} {...props} 
                            autoComplete='off' 
                            disabled = { disabled }
                            className={`shadow appearance-none rounded w-full py-2 px-2 text-grey-darker text-sm
                                                     ${ textCenter ? 'text-center' : '' }
                                                    focus:border-gray-400 
                                                      focus:outline-0 
                                                      focus:shadow 
                                                    focus:shadow-gray-300  
                                                      hover:outline-0 
                                                    hover:border-gray-400 
                                                      ${ !!error ? 'border border-red-600' : 'border' }
                                                    `} />
            
        </>
  )
}