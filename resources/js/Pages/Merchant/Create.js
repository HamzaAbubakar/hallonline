import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';

const Create = () => {

  // const { organizations } = usePage().props;

  const { data, setData, errors, post, processing } = useForm({
    name: '',
    phone: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('merchants.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('merchants.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Merchants
        </InertiaLink>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="First Name"
              name="first_name"
              errors={errors.name}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Phone"
              name="phone"
              type="text"
              errors={errors.phone}
              value={data.phone}
              onChange={e => setData('phone', e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Merchant
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Create Merchant" children={page} />;

export default Create;
