<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use softDeletes;
    protected $table = 'events';
    protected $fillable = ['name', 'concept', 'type', 'date', 'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by', 'deleted_by'];
    public $timestamps = true;

}
