<nav class="w-full h-max bg-black py-4 px-8 flex flex-col gap-6" x-data="{open: false}">
    <div class="w-full h-max items-center justify-between hidden md:flex">
        <div class="w-max h-max flex flex-row items-center justify-center gap-10">
            <x-fab-instagram class="w-4 aspect-auto text-white"/>
            <x-fab-facebook-f class="w-3 aspect-auto text-white"/>
            <x-fab-whatsapp class="w-4 aspect-auto text-white"/>
        </div>
        <div class="w-max h-max flex items-center justify-center gap-6 text-white font-medium text-base">
            <a href="/#" wire:navigate>Contact</a>
            <a href="/#" wire:navigate>Login</a>
            <span class="font-bold border-b-[.5px] border-b-white pb-1">EN</span>
        </div>
    </div>
    <div class="w-full h-max flex items-center justify-between">
        <img class="w-full aspect-auto max-w-[175px]" src="{{asset('images/logo.svg')}}"/>
        <div class="w-max h-max items-center justify-center gap-6 text-white font-medium text-base hidden md:flex">
            <a href="/#" wire:navigate>Examples</a>
            <a href="/#" wire:navigate>Shipment</a>
            <a href="/#" wire:navigate>About Us</a>
            <x-fas-shopping-basket class="text-white w-8 aspect-auto" />
        </div>
        <div class="w-10 h-max flex md:hidden flex-col gap-2 cursor-pointer" @click="open = !open">
            <div class="w-full h-0.5 bg-white transition-all duration-300 data-[open=true]:-rotate-45" x-bind:data-open="open"></div>
            <div class="w-full h-0.5 bg-white transition-all duration-300 data-[open]:hidden" x-bind:data-open="open"></div>
            <div class="w-full h-0.5 bg-white transition-all duration-300 data-[open=true]:rotate-45 data-[open=true]:-translate-y-[.56rem]" x-bind:data-open="open"></div>
        </div>
        <div x-show="open" class="flex md:hidden flex-col items-center justify-start py-4 gap-4 fixed top-0 left-0 animate-show-navbar w-40 h-screen bg-black border-r-primary-1 border-r-[1px]" @click.outside="open = false">
            <span class="font-bold text-xl text-white py-4">Dr.Patches</span>
            <div class="w-max h-max flex flex-col items-center justify-center gap-6 text-white font-medium text-base">
                <a href="#" wire:navigate>Login</a>
                <a href="#" wire:navigate>Examples</a>
                <a href="#" wire:navigate>Shipment</a>
                <a href="#" wire:navigate>About Us</a>
                <a href="#" wire:navigate>Contact</a>
            </div>
            <div class="text-white font-bold text-xs flex items-center justify-center gap-2 mt-auto">
                <span>Language:</span>
                <span class="border-b-[.5px] border-b-white pb-1">EN</span>
            </div>
            <div class="w-max h-max flex flex-row items-center justify-center gap-5">
                <x-fab-instagram class="w-4 aspect-auto text-white"/>
                <x-fab-facebook-f class="w-3 aspect-auto text-white"/>
                <x-fab-whatsapp class="w-4 aspect-auto text-white"/>
            </div>
        </div>
    </div>
</nav>
