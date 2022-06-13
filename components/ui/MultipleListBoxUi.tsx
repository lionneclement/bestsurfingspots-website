import {Listbox, Transition} from '@headlessui/react';
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';
import {Dispatch, Fragment, SetStateAction} from 'react';
import {ProductSize} from '../../graphql/types/Product';
import {classNames} from '../../helpers/ClassName';

export const MultipleListBoxUI = ({
  value,
  setValue,
  data,
  containerClassName = ''
}: {
  value: ProductSize[];
  setValue: Dispatch<SetStateAction<ProductSize[]>>;
  data: ProductSize[];
  containerClassName?: string;
}) => {
  return (
    <div className={classNames('relative w-72', containerClassName)}>
      <Listbox value={value} onChange={setValue} as="div" multiple>
        <div className="relative mt-1">
          <Listbox.Button className="font-medium inline-flex w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            <span className="block truncate">Size ?</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map((data, index) => (
                <Listbox.Option
                  key={index}
                  className={({active}) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-primary text-white' : 'text-gray-900'
                    }`
                  }
                  value={data}>
                  {({selected}) => (
                    <>
                      <span className={`block truncate`}>{data.size}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <div className="p-2 text-sm">{value.length > 0 && <>Size: {value.map(({size}) => size).join(', ')}</>}</div>
    </div>
  );
};
