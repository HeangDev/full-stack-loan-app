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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('tel');
            $table->string('password');
            $table->string('plain_password');
            $table->string('current_occupation')->nullable();
            $table->string('monthly_income')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('current_address')->nullable();
            $table->string('emergency_contact_number')->nullable();
            $table->string('credit')->default('0');
            $table->enum('status', ['incomplete', 'complete'])->default('incomplete');
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
        Schema::dropIfExists('users');
    }
};
