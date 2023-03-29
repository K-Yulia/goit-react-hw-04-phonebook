import PropTypes from 'prop-types';
import { Box, Text, Input } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  return (
    <div>
      <Box>
        <Text>Find contacts by name</Text>
        <Input type="text" value={value} onChange={onChange} />
      </Box>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
