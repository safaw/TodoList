<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{

    public function index(){
        return Task::all();
    }

    public function store(Request $request){
        return Task::create(['title' => $request->title,'user_id' => $request->affectedTo]);
    }

    public function update(Request $request,$id){
        $task=Task::findOrFail($id);
        //$task = Task::find($request->id);
        $task->update(['title' => $request->title,'user_id' => $request->affectedTo,'completed' => $request->completed]);
        //$task->update($request->all());
        //$task->save();
        return $task;
    }

    public function delete($id){
        $task=Task::findOrfail($id);
        $task->delete();
        return 204;
    }
}
