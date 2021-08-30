import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import TrashedMessage from '@/Shared/TrashedMessage';

const Edit = () => {
  const { merchant } = usePage().props;
  const { data, setData, errors, put, processing } = useForm({
    name: merchant.name || '',
    phone: merchant.phone || '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('merchants.update', merchant.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this merchant?')) {
      Inertia.delete(route('merchants.destroy', merchant.id));
    }
  }

  // function restore() {
  //   if (confirm('Are you sure you want to restore this merchant?')) {
  //     Inertia.put(route('merchant.restore', contact.id));
  //   }
  // }

  return (
    <div>
      <Helmet title={`${data.name}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('merchants.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Merchants
        </InertiaLink>
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Name"
              name="name"
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
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!merchant.deleted_at && (
              <DeleteButton onDelete={destroy}>Delete Contact</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Merchant
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
