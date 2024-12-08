import Select from 'react-select';
import { ClassNamesConfig } from 'react-select';

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    height: '40px',
    minHeight: '40px',
    borderRadius: '0.5rem',
    borderWidth: '1px',
    borderColor: state.isFocused ? 'rgb(59, 130, 246)' : 'rgb(229, 231, 235)',
    backgroundColor: 'white',
    '&:hover': {
      borderColor: 'rgb(59, 130, 246)'
    },
    boxShadow: state.isFocused ? 'rgb(59 130 246) 0px 0px 0px 1px' : 'none',
    transition: 'all 0.2s',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'rgb(55, 65, 81)',
  }),
  placeholder: (base: any) => ({
    ...base,
    color: 'rgb(156, 163, 175)'
  }),
  input: (base: any) => ({
    ...base,
    color: 'rgb(55, 65, 81)',
    margin: 0,
    padding: 0
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: '0 0.75rem'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: '0 0.5rem',
    color: 'rgb(156, 163, 175)',
    '&:hover': {
      color: 'rgb(107, 114, 128)'
    }
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 50,
    marginTop: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? 'rgb(243, 244, 246)' : 'white',
    color: 'rgb(55, 65, 81)',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: 'rgb(229, 231, 235)'
    }
  })
};

export function SelectSearch({ ...props }) {
  return (
    <Select
      {...props}
      styles={{
        ...selectStyles,
        ...props.styles
      }}
      className="react-select"
      classNamePrefix="react-select"
    />
  );
} 