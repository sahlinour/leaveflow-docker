<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Employee\StoreEmployeeRequest;
use App\Http\Requests\Employee\UpdateEmployeeRequest;
use App\Models\Company;
use App\Models\Conge;
use App\Models\Role;
use App\Models\User;
use App\Services\Employee\EmployeeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function __construct(
        private readonly EmployeeService $employeeService
    ) {}

    public function index(Request $request)
    {
        $employees = User::with([
            'role',
            'company',
            'dernierConge',
        ])
            ->whereHas('role', function ($query) {
                $query->where('slug', 'employe');
            })
            ->when($request->company, function ($query) use ($request) {
                $query->where(
                    'company_id',
                    $request->company
                );
            })
            ->when($request->search, function ($query) use ($request) {
                $query->where(function ($q) use ($request) {
                    $q->where('prenom','like',"%{$request->search}%")
                        ->orWhere('nom','like',"%{$request->search}%")
                        ->orWhere('email','like',"%{$request->search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $trashCount = User::onlyTrashed()
            ->whereHas('role', function ($query) {
                $query->where('slug', 'employe');
            })
            ->count();

        return Inertia::render('Admin/Employees/index',
            [
                'employees' => $employees->through(
                    function ($employee) {
                        $conge = Conge::where(
                            'user_id',
                            $employee->id
                        )
                            ->latest('annee')
                            ->first();

                        return [
                            'id' => $employee->id,
                            'prenom' => $employee->prenom,
                            'nom' => $employee->nom,
                            'email' => $employee->email,
                            'photo' => $employee->photo,
                            'poste' => $employee->poste,
                            'date_embauche' => $employee->date_embauche,
                            'statut' => $employee->statut,
                            'company' => $employee->company,
                            'roleLabel' => $employee->role?->name,
                            'solde_initial' => $conge?->solde_initial ?? 25,
                            'jours_utilise' => $conge?->jours_utilise ?? 0,
                            'jours_restants' => $conge ? $conge->solde_initial - $conge->jours_utilise : 25,
                        ];
                    }
                ),

                'companies' => Company::orderBy('nom')
                    ->get(['id', 'nom']),
                'filters' => $request->only([
                    'company',
                    'search',
                ]),
                'trashCount' => $trashCount,
            ]
        );
    }
    public function create()
    {
        return Inertia::render('Admin/Employees/create',
            [
                'companies' => Company::orderBy('nom')
                    ->get(),
                'role' => Role::where(
                    'slug',
                    'employe'
                )->first(),
            ]
        );
    }

    public function store(StoreEmployeeRequest $request) 
    {
        $this->employeeService->create(
            $request->validated(),
            $request->file('photo')
        );

        return redirect()
            ->route('employees.index')
            ->with(
                'success',
                'Employee created successfully.'
            );
    }

    public function edit(string $id)
    {
        $employee = User::with([
            'company',
            'role',
        ])->findOrFail($id);

        return Inertia::render('Admin/Employees/edit',
            [
                'employee' => $employee,
                'companies' => Company::orderBy('nom')
                    ->get(),
                'roles' => Role::where(
                    'slug',
                    'employe'
                )->get(),
            ]
        );
    }
    public function update(UpdateEmployeeRequest $request, string $id) 
    {
        $employee = User::findOrFail($id);
        $this->employeeService->update(
            $employee,
            $request->validated(),
            $request->file('photo')
        );
        return redirect()
            ->route('employees.index')
            ->with(
                'success',
                'Employé modifié avec succès.'
            );
    }

    public function destroy(string $id)
    {
        $employee = User::findOrFail($id);
        $this->employeeService->delete(
            $employee
        );
        return redirect()
            ->route('employees.index')
            ->with(
                'success',
                'Employé supprimé avec succès.'
            );
    }
    public function trash()
    {
        $employees = User::onlyTrashed()
            ->with([
                'company',
                'role',
            ])
            ->whereHas('role', function ($query) {
                $query->where('slug', 'employe');
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render(
            'Admin/Employees/trash',
            [
                'employees' => $employees,
            ]
        );
    }
    public function restore(string $id)
    {
        $employee = User::onlyTrashed()
            ->findOrFail($id);
        $this->employeeService->restore(
            $employee
        );

        return redirect()
            ->route('employees.trash')
            ->with(
                'success',
                'Employé restauré avec succès.'
            );
    }
    public function forceDelete(string $id)
    {
        $employee = User::onlyTrashed()
            ->findOrFail($id);
        $this->employeeService->forceDelete(
            $employee
        );

        return redirect()
            ->route('employees.trash')
            ->with(
                'success',
                'Employé supprimé définitivement.'
            );
    }
}