
import ReactLoading from 'react-loading';

// eslint-disable-next-line react/prop-types
const Loading = ({ type, color }) => (
	<ReactLoading type={type} color={color} height={'100px'} width={'100px'} />
);

export default Loading;