import React from "react";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { TextField, Select } from '../../reusable/InputItems';
import Modal from '../../reusable/Modal';
import { Mini } from "../Elements";
import { QUESTION_TYPES } from '../Constants';

const validationSchema = Yup.object().shape({
	question: Yup.string().required('Please enter Question'),
	type: Yup.string().required('Please select Type'),
	order: Yup.number().required('Pleae enter Order'),
});

const QuestionFormModal = (props) => {
	const { visible, onClose, onSubmit, mode, values = {} } = props;

	return (
		<Modal
			visible={visible}
			onClose={onClose}
			title={`${mode} Question`}
			requireFooter={false}
		>
			<Formik
				initialValues={values}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{() => (
					<Form>
						<Field
							name="question"
							component={TextField}
							label="Question*"
							placeholder="Question"
						/>
						<Field
							name="order"
							component={TextField}
							label="Order*"
							placeholder="Order"
						/>
						<Field
							name="type"
							component={Select}
							label="Type*"
							options={QUESTION_TYPES}
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

export default QuestionFormModal;
