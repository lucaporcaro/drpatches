<?php

use function Livewire\Volt\{layout};

layout('layouts.root');

?>

<div class="w-full h-max flex flex-col max-w-[1620px] mx-auto">
    <div
        class="w-full h-max flex flex-col items-center justify-center py-10 px-8 xl:flex-row-reverse xl:justify-between">
        <div class="w-max h-max">
            <img src="{{asset('images/hero.jpeg')}}" alt="Hero Image"
                 class="w-full max-w-[545px] aspect-auto rounded-3xl xl:max-w-[720px]"
            />
        </div>
        <div
            class="w-full max-w-[706px] px-8 py-4 text-black flex flex-col items-center justify-center gap-8 text-center">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold">Create Your Own Patch</h2>
            <p class="text-lg md:text-xl font-medium">You can create your custom patch with our simple platform</p>
            <a href="#" wire:navigate>
                <x-button>Order Now</x-button>
            </a>
        </div>
    </div>
</div>

