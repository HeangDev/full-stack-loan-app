<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('document_ids', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user');
            $table->string('name')->nullable();
            $table->string('id_number')->nullable();
            $table->string('front', 2048)->nullable();
            $table->string('back', 2048)->nullable();
            $table->string('full', 2048)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('document_ids');
    }
};
