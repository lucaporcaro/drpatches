<?php

use function Livewire\Volt\{state};

state(['value' => ''])->modelable();

state(['open' => false, 'items' => [asset('images/select.png'), asset('images/select.png'), asset('images/select.png'), asset('images/select.png'), asset('images/select.png'), asset('images/select.png'), asset('images/select.png'), asset('images/select.png')]]);

$toggleModal = fn() => ($this->open = !$this->open);
$selectItem = function (string $item) {
    $this->value = $item;
    $this->toggleModal();
};

?>

<div class="w-full h-max">
    <div class="w-max flex flex-row items-center justify-start gap-4">
        <span class="font-semibold text-xl">Selected Type</span>
        <div class="bg-white w-max h-max rounded-md overflow-hidden cursor-pointer p-2" wire:click="toggleModal">
            @if ($this->value)
                <img src="{{ $this->value }}" class="w-10 aspect-auto" />
            @else
                <span class="font-semibold text-sm">Choose</span>
            @endif
        </div>
    </div>
    @if ($this->open)
        <div class="w-screen h-screen fixed top-0 left-0 bg-black/30 flex items-center justify-center">
            <div class="w-11/12 h-max max-w-[600px] py-10 px-6 bg-black rounded-lg grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-5 border-primary-1 border-2"
                @click.away="$wire.toggleModal()">
                @foreach ($this->items as $item)
                    <div class="w-max h-max bg-white p-3 rounded-lg hover:bg-primary-1 transition-all duration-200 cursor-pointer"
                        wire:click="selectItem('{{ $item }}')">
                        <img class="w-16 aspect-auto" src="{{ $item }}" />
                    </div>
                @endforeach
            </div>
        </div>
    @endif
</div>
