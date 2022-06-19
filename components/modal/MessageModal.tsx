import {Dialog, Transition} from '@headlessui/react';
import {CheckIcon} from '@heroicons/react/solid';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Fragment, useRef} from 'react';
import {graphqlClient} from '../../graphql/GraphqlClient';
import {ADD_MESSAGE} from '../../graphql/mutation/MessageMutation';
import {AddMessage, AddMessageVariable} from '../../graphql/types/Message';

export const MessageModal = ({
  isOpen,
  closeModal,
  productId
}: {
  closeModal: () => void;
  isOpen: boolean;
  productId: number;
}) => {
  const textareaRef = useRef<HTMLInputElement | null>(null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-2">
                  <Formik
                    initialValues={{email: '', message: ''}}
                    validate={(values) => {
                      const errors: {email?: string; message?: string} = {};
                      if (!values.email) {
                        errors.email = 'Required';
                      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                      }
                      if (!values.message) {
                        errors.message = 'Required';
                      }
                      return errors;
                    }}
                    onSubmit={(values) => {
                      graphqlClient.mutate<{message: AddMessage}, AddMessageVariable>({
                        mutation: ADD_MESSAGE,
                        variables: {email: values.email, content: values.message, product_id: productId}
                      });
                    }}>
                    {({isSubmitting}) =>
                      isSubmitting ? (
                        <div className="text-center flex flex-col items-center">
                          <CheckIcon className="h-32 w-32" aria-hidden="true" />
                          <span className="font-semibold text-primary text-2xl">Message delivered!</span>
                          <span className="inline-block">Your message was sent successfully</span>
                        </div>
                      ) : (
                        <>
                          <span className="text-center text-2xl font-medium text-primary">Message</span>
                          <Form className="mt-4">
                            <label className="p-1" htmlFor="email">
                              Email
                            </label>
                            <Field
                              className="border w-full px-4 py-2 rounded-lg"
                              type="email"
                              name="email"
                              placeholder="ilovesurfing@gmail.com"
                              onKeyDown={(keyEvent: any) => {
                                if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
                                  keyEvent.preventDefault();
                                  textareaRef.current?.focus();
                                }
                              }}
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 px-2 mb-4" />
                            <div className="mt-4">
                              <label className="p-1" htmlFor="email">
                                Message to the seller
                              </label>
                              <Field
                                innerRef={textareaRef}
                                className="border w-full h-auto px-4 py-2 rounded-lg"
                                as="textarea"
                                name="message"
                                placeholder="Is this available ?"
                                rows={5}
                              />
                              <ErrorMessage name="message" component="div" className="text-red-500 px-2" />
                            </div>
                            <div className="flex mt-6 justify-between">
                              <button
                                type="button"
                                className="rounded-md text-sm font-medium text-black"
                                onClick={closeModal}>
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className=" rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white">
                                Send Message
                              </button>
                            </div>
                          </Form>
                        </>
                      )
                    }
                  </Formik>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
