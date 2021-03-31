import React from "react";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { TextField, Select } from '../../reusable/InputItems';
import Modal from '../../reusable/Modal';
import { Mini } from "../Elements";
import { QUESTION_TYPES } from '../Constants';

const validationSchema = Yup.object().shape({
	question: Yup.string().required('Please select Question'),
	user: Yup.string().required('Please select User'),
	answer: Yup.string().required('Pleae enter Answer'),
});

const AnswerFormModal = (props) => {
	const { visible, onClose, onSubmit, mode, values = {}, users = [], questions = [] } = props;

	return (
		<Modal
			visible={visible}
			onClose={onClose}
			title={`${mode} Answer`}
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
							name="user"
							component={Select}
							label="User*"
							options={users}
						/>
						<Field
							name="question"
							component={Select}
							label="Question*"
							options={questions}
						/>
						<Field
							name="answer"
							component={TextField}
							label="Answer*"
							multiline
							rows={6}
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

export default AnswerFormModal;
