

const targetHeight = 28;

export const customStyles = {
    option: (provided, state ) => ({
        ...provided,
        zIndex:'2',
        borderBottom: '1px dotted pink',
        fontSize: '10px',
      }),
    control: (base, state) => ({
        ...base,
        borderRadius: "7px", 
        padding:"1px", 
        backgroundColor:'#fff', 
        verticalAlign : 'top',
        fontSize : '12px',
        minHeight: 'initial',
        boxShadow:  state.isFocused ? '0 1px 3px 0 rgb(156 162 173), 0 1px 2px -1px rgb(156 162 173)' :'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        borderColor: state.isFocused ? "4px solid #5a5a5a" : "1px solid #9ca2ad",
        outlineWidth: state.isFocused ? "0px" : "1px",
        "&:hover": {
          border: "1px solid #9ca2ad",},
      }),
      valueContainer: (base) => ({
        ...base,
        padding: '3px 8px',
      }),
      clearIndicator: (base) => ({
        ...base,
        padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
      }),
      dropdownIndicator: (base) => ({
        ...base,
        padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
      }),
      menu: base => ({ ...base, zIndex: 2 })
}

// export const errorCustomStyle = {
//   control: (base) => ({
//     ...base,
//     borderRadius: "7px", 
//     padding:"0px", 
//     backgroundColor:'#fff', 
//     verticalAlign : 'top',
//     fontSize : '13px',
//     minHeight: 'initial',
//    // borderColor : '#bf1d1d'
//   }),
// }