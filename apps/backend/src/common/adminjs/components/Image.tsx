import React from 'react';

export default function ImageView({ key = 'image', record: { params } }: any) {
  console.log(params);
  const baseUrl = window.location.host;
  return (
    <div>
      <span
        style={{
          display: 'block',
          fontFamily: '"Roboto", sans-serif',
          fontSize: 12,
          lineHeight: 16,
          color: 'rgb(137, 138, 154)',
          fontWeight: 300,
        }}
      >
        Image
      </span>
      <img
        width={260}
        style={{ aspectRatio: 'auto' }}
        src={`${window.location.protocol}//${baseUrl}/${params[key]}`}
      />
    </div>
  );
}
