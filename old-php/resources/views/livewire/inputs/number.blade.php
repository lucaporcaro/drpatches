<?php

use function Livewire\Volt\{state};

state(['value'])->modelable();

state(['step' => 1, 'label' => '', 'unit' => '', 'min' => 2.5, 'max' => 20]);

$increase = fn() => $this->value >= $this->max ? null : $this->value += $this->step;
$decrease = fn() => $this->value <= $this->min ? null : $this->value -= $this->step;

?>

<div class="w-full h-max flex flex-col gap-3">
    @if($this->label || $this->unit)
        <div class="w-full flex items-center justify-between font-medium text-base">
            <span>{{$this->label}}</span>
            <span class="text-white">{{$this->unit}}</span>
        </div>
    @endif
    <div class="w-full h-10 flex flex-row items-center justify-center rounded-md overflow-hidden">
        <div class="p-2 h-full flex items-center justify-center bg-black cursor-pointer" wire:click="decrease">
            <x-fas-minus class="text-white w-5 aspect-auto"/>
        </div>
        <div class="h-full flex-auto bg-white flex items-center justify-center">
            <span class="font-medium text-base">{{$this->value}}</span>
        </div>
        <div class="p-2 h-full flex items-center justify-center bg-black cursor-pointer" wire:click="increase">
            <x-fas-plus class="text-white w-5 aspect-auto"/>
        </div>
    </div>
</div>
