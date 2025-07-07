
export default function Image({ src, alt, className = '' }: { src: string, alt?: string, className?: string }) {
    return (
        <img
            src={src}
            alt={alt ?? ''}
            loading="lazy"
            className={`object-cover ${className}`}
        />
    );
}
