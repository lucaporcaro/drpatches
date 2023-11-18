<?php

use function Livewire\Volt\{state, computed};

state('value')->modelable();
state('label')->reactive();
state('type')->locked();


?>
<div class="w-full h-max flex flex-col items-start justify-start gap-2">
    <span class="font-semibold text-black text-xl">{{$this->label}}</span>
    <input type="{{$this->type}}" wire:model="value"
           class="w-full h-10 text-black outline-none bg-white flex items-center justify-start px-3 rounded-xl"/>
</div>
