type Props = {
  htmlContent: string;
};

export const PdfRenderer: React.FC<Props> = ({ htmlContent }) => {

  return (
    <div
      style={{
        maxWidth:"calc(100vw - 52px)",
        overflowWrap: "break-word",
        wordWrap: "break-word",
        overflowX: "auto",
      }}
      
    >
      <div dangerouslySetInnerHTML={{ __html: htmlContent }}>

      </div>
    </div>
  );
};
