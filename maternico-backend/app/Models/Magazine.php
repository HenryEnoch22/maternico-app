<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Magazine extends Model
{
    use softDeletes;
    public $timestamps = true;

    protected $table = 'magazines';
    protected $fillable = ['title', 'magazine_path', 'created_at', 'deleted_at'];

    public static $categories = [
        0 => '0 a 1 año',
        1 => '1 año',
        2 => '2 años',
        3 => '3 años',
        4 => '4 años',
        5 => '5 años',
    ];


}
