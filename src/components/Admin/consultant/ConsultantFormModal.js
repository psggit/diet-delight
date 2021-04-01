import React from "react";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { TextField, Select } from '../../reusable/InputItems';
import Modal from '../../reusable/Modal';
import { Mini } from "../Elements";
import { CONSULTANT_STATUS } from '../Constants';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Please Select User'),
	status: Yup.string(),
	qualification: Yup.string(),
	bio: Yup.string(),
	order: Yup.string().required('Please Enter Order'),
});

const ConsultantFormModal = (props) => {
	const { visible, onClose, onSubmit, mode, values = {}, users } = props;

	return (
		<Modal
			visible={visible}
			onClose={onClose}
			title={`${mode} Consultant`}
			requireFooter={false}
		>
			<Formik
				initialValues={{...values, status: (typeof values.status === 'number') ? values.status + 1 : '',}}
				validationSchema={validationSchema}
				onSubmit={(values) => onSubmit({...values, status: values.status - 1})}
			>
				{() => (
					<Form>
						<Field
							name="name"
							component={Select}
							label="Name*"
							options={users}
							disabled={mode === 'Update'}
						/>
						<Field
							name="status"
							component={Select}
							label="Status"
							options={CONSULTANT_STATUS.map((option) => ({ ...option, id: option.id + 1 }))}
						/>
						<Field
							name="qualification"
							component={TextField}
							label="Qualification"
						/>
						<Field
							name="order"
							component={TextField}
							label="Order*"
						/>
						<Field
							name="bio"
							component={TextField}
							label="Bio"
							multiline
							rows={4}
						/>
						<Mini style={{ marginTop: "10px" }}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								style={{ margin: "8px 8px 8px 0", background: "#800080", padding: '8px 20px' }}
							>
								Submit
              				</Button>
							<Button
								variant="contained"
								color="primary"
								style={{ margin: "8px 0 8px 8px", background: "#800080", padding: '8px 20px' }}
								onClick={onClose}
							>
								Close
              				</Button>
						</Mini>
					</Form>
				)}
			</Formik>
		</Modal>
	)
}

export default ConsultantFormModal;
