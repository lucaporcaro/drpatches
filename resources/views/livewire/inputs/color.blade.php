<?php

use function Livewire\Volt\{state, computed};

state('value')->modelable();
state(['color', 'label'])->reactive()


?>
<div class="w-full h-max flex flex-col items-start justify-start gap-2">
    <span class="font-semibold text-black text-xl">{{$this->label}}</span>
    <div class="w-full flex items-center justify-center rounded-xl overflow-hidden">
        <div class="w-10 h-10" style="background-color: {{$this->color}}"></div>
        <div class="w-full h-10 text-black outline-none bg-white flex items-center justify-start px-3"
             @click="$refs.colorInput.click()">
            <span>{{$this->color}}</span>
        </div>
        <input x-ref="colorInput" type="color" wire:model="value" hidden/>
    </div>
</div>
