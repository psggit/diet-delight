import React from "react";
import { Button, InputAdornment, Icon } from "@material-ui/core";
import { Delete } from '@material-ui/icons';

import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";

import { TextField, Select } from '../../reusable/InputItems';
import Modal from '../../reusable/Modal';
import { Mini } from "../Elements";
import { AddButtonDiv } from "./QuestionElements";
import { QUESTION_TYPES } from '../Constants';

const validationSchema = Yup.object().shape({
	question: Yup.string().required('Please enter Question'),
	type: Yup.string().required('Please select Type'),
	order: Yup.number().required('Please enter Order'),
	options: Yup.array().of(Yup.object().shape({
		option: Yup.string(),
	}))
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
				initialValues={{ ...values, type: (typeof values.type === 'number') ? values.type + 1 : '', }}
				validationSchema={validationSchema}
				onSubmit={(values) => onSubmit({ ...values, type: values.type - 1 })}
			>
				{({ values, errors }) => (
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
							options={QUESTION_TYPES.map((option) => ({ ...option, id: option.id + 1 }))}
						/>
						{mode === 'Add' && values.type === QUESTION_TYPES[2].id + 1 && (
							<>
								Add Options
								<FieldArray
									name="options"
									render={(arrayHelper) => {
										return (
											<>
												{values.options.map((option, index) => {
													return (
														<AddButtonDiv>
															<Field
																name={`options[${index}].option`}
																component={TextField}
																label="Option"
																InputProps={{
																	endAdornment: index !== 0 ? (
																		<InputAdornment position="end">
																			<Delete onClick={() => arrayHelper.remove(index)} style={{ cursor: 'pointer' }} />
																		</InputAdornment>
																	) : null
																}}
																style={{ width: '85%' }}
																fieldPath={[index, 'option']}
															/>
															{index === values.options.length - 1 && (
																<Icon style={{ fontSize: 30, margin: '0 16px', cursor: 'pointer' }} onClick={() => arrayHelper.push({ option: '' })}>add_circle</Icon>
															)}
														</AddButtonDiv>
													)
												})}
											</>
										)
									}}
								/>
							</>
						)}
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
