<?php

use function Livewire\Volt\{layout, state};

layout('layouts.root');

state([
    'why_items' => [
        [
            'title' => 'Free Design',
            'description' => 'Unlimited Revision',
            'icon' => 'fas-drafting-compass',
        ],
        [
            'title' => 'Fair Price',
            'description' => 'Save 30%',
            'icon' => 'fas-hand-holding-dollar',
        ],
        [
            'title' => 'Fast Turnaround',
            'description' => 'Less than 10 days',
            'icon' => 'fas-truck-moving',
        ],
        [
            'title' => 'Guarantee',
            'description' => '100% money back',
            'icon' => 'fas-shield-alt',
        ]
    ]
])

?>

<div class="w-full h-max flex flex-col mx-auto">
    <section
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
                <a href="{{route('product.create')}}" wire:navigate>
                    <x-button>Order Now</x-button>
                </a>
            </a>
        </div>
    </section>
    <section
        class="w-full h-max flex flex-col items-center justify-center py-10 px-8 bg-primary-1 text-black gap-8 lg:gap-10 lg:py-14">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold">Why Choose Us?</h2>
        <p class="w-11/12 max-w-[1134px] text-center text-base md:text-lg lg:text-2xl font-medium">Often those seeking
            custom lapel pins have a decision to make – pay much more for high-quality work or
            receive inferior quality pins while staying within a lower budget. We eliminate this decision for you! With
            Vivipins you get the highest quality custom pins at prices you can afford. Plus, we have no minimum orders!
            You can order anywhere from 1 pin to 10,000 or more pins – and you can count on paying cheap prices no
            matter the quantity of your order. Get your personalized pins now without breaking your budget. We also
            offer fast delivery and we provide digital proofs for you to sign off on before production begins. Get
            started now.</p>
        <div
            class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 place-items-center place-content-between">
            @foreach($why_items as $item)
                <div class="w-max h-max flex flex-col items-center justify-center gap-8">
                    {{svg($item['icon'], [
                        'class' => 'w-11 aspect-auto text-black'
                    ])}}
                    <div class="w-max min-w-full flex flex-col items-center justify-center gap-3.5">
                        <span class="text-2xl font-bold">{{$item['title']}}</span>
                        <span class="text-xl font-medium">{{$item['description']}}</span>
                    </div>
                </div>
            @endforeach
        </div>
        <a href="{{route('product.create')}}" wire:navigate>
            <x-button>Customize now</x-button>
        </a>
    </section>
</div>

