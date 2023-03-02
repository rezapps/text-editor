import ReactQuill from 'react-quill';

const TxtEditor = ({...props}) => {

	let title = ''


	const handleChange = (e) => {
		title = e.target.value;
		props.setTitle(title);
	}

	return (
		<>
			<div className='docTitleInput'>
				{props.placeHolder ? 
					<input
						placeholder={props.placeHolder}
						onChange={handleChange}
						required
						key={props._id}
					/>
					:
					<input
						value={props.title}
						onChange={handleChange}
						required
						key={props._id}
					/>
			
				}
			</div>

			{
				props.placeHolder ?
					<ReactQuill 
						theme="snow"
						onChange={props.setText}
						placeholder={props.placeHolder}
					/>
				:
					<ReactQuill 
						theme="snow"
						value = {props.text}
						onChange={props.setText}
					/>
			}
		</>
	);
}

export default TxtEditor;
