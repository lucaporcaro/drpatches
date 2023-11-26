<?php

function format_print_size(float $number): float {
    $precision = $number - (int)$number; // Round the number and keep the decimal portion
    if ($precision === 0.75 || $precision === 0.25)
        $number -= 0.25;
    return $number; // Output the result
}
