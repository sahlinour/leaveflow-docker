<?php

namespace App\Services\Employee;

use App\Models\Conge;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;

class EmployeeService
{
    public function __construct(
        private EmployeeMatriculeService $matriculeService
    ) {
    }

    public function create(array $data,?UploadedFile $photo = null): User 
    {
        if ($photo) {
            $data['photo'] = $photo->store(
                'employees',
                'public'
            );
        }
        $data['password'] = Hash::make(
            $data['password']
        );
        $data['matricule'] =
            $this->matriculeService->generate(
                $data['company_id'] ?? null
            );
        $data['role_id'] = Role::where(
            'slug',
            'employe'
        )->value('id');

        return User::create($data);
    }

    public function update(User $employee,array $data, ?UploadedFile $photo = null): User 
    {
        if ($photo) {
            $data['photo'] = $photo->store(
                'employees',
                'public'
            );
        }

        $employee->update($data);
        return $employee;
    }

    public function delete(User $employee): void
    {
        Conge::where(
            'user_id',
            $employee->id
        )->delete();

        $employee->delete();
    }

    public function restore(User $employee): void
    {
        $employee->restore();
        Conge::onlyTrashed()
            ->where(
                'user_id',
                $employee->id
            )
            ->restore();
    }

    public function forceDelete(User $employee): void
    {
        $employee->forceDelete();
    }
}