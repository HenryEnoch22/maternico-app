<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MagazinesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('magazines')->insert([
            [
                'id' => 1,
                'title' => 'Cero a 1 año',
                'magazine_path' => 'Revista0Años.pdf',
                'category' => '0 a 1 año',
                'created_at' => Carbon::now(),
            ],
            [
                'id' => 2,
                'title' => '1 Año',
                'magazine_path' => 'Revista1Año.pdf',
                'category' => '1 año',
                'created_at' => Carbon::now(),
            ],
            [
                'id' => 3,
                'title' => '2 Años',
                'magazine_path' => 'Revista2Años.pdf',
                'category' => '2 años',
                'created_at' => Carbon::now(),
            ],
            [
                'id' => 4,
                'title' => '3 Años',
                'magazine_path' => 'Revista3Años.pdf',
                'category' => '3 años',
                'created_at' => Carbon::now(),
            ],
            [
                'id' => 5,
                'title' => '4 Años',
                'magazine_path' => 'Revista4Años.pdf',
                'category' => '4 años',
                'created_at' => Carbon::now(),
            ],
            [
                'id' => 6,
                'title' => '5 Años',
                'magazine_path' => 'Revista5Años.pdf',
                'category' => '5 años',
                'created_at' => Carbon::now(),
            ],
        ]);
    }
}
