<?php

namespace App\Http\Controllers;

use App\Http\Requests\MerchantStoreRequest;
use App\Http\Requests\MerchantUpdateRequest;
use App\Http\Resources\MerchantCollection;
use App\Http\Resources\MerchantResource;
use App\Http\Resources\UserOrganizationCollection;
use App\Models\Merchant;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class MerchantController extends Controller
{
    public function index()
    {
        return Inertia::render('Merchant/Index', [
            'filters' => Request::all('search', 'trashed'),
            'merchants' => new MerchantCollection(
                    Merchant::orderByName()
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Merchant/Create');
    }

    public function store(MerchantStoreRequest $request)
    {
        Merchant::create($request->validated());
        return Redirect::route('merchants.index')->with('success', 'Merchant created.');
    }

    public function edit(Merchant $merchant)
    {
        return Inertia::render('Merchant/Edit', ['merchant' => new MerchantResource($merchant)]);
    }

    public function update(Merchant $merchant, MerchantUpdateRequest $request)
    {
        $merchant->update($request->validated());
        return Redirect::back()->with('success', 'Merchant updated.');
    }

    public function destroy(Merchant $merchant)
    {
        $merchant->delete();
        return Redirect::route('merchants.index')->with('success', 'Merchant deleted.');
    }

    public function restore(Merchant $merchant)
    {
        $merchant->restore();
        return Redirect::back()->with('success', 'Merchant restored.');
    }
}
