<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateReqeust extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "name"=>'required|string',
            "price"=>'required|numeric'
        ];
    }
    public function messages()
    {
        return [
            "name.required"=>"အမည်ထည့်ပေးပါ။",
            "price.required"=>"အမည်သည်စာသားထည့်ရမည်။",
            "name.string"=>"အမည်သည်စာသားထည့်ရမည်။",
            "price.numeric"=>"ဈေးနှုန်းသည်ဂဏန်းဖြစ်ရမည်။"
        ];
    }
}
